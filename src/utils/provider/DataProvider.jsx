// providers/DataProvider.jsx
import { createContext, useContext, useCallback, useState } from 'react';

// supabase deps utility functions.
import { supabase } from '@utils/supabase';
import { useAuth } from '@utils/provider/AuthProvider';

const DataContext = createContext(undefined);

/**
 * Provides notes-related state and CRUD operations to descendant components
 * via React context. Wraps Supabase calls for the `notes` table, scoped to
 * the currently authenticated user (from `useAuth`).
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that will have access to the data context.
 * @returns {JSX.Element} A context provider exposing `notes`, `loading`, and note CRUD methods.
 */
export function DataProvider({ children }) {
    const { user } = useAuth();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    /**
     * Creates a new note for the current user and appends it to local state
     * on success.
     *
     * @param {string} title - The note's title.
     * @param {string} content - The note's body content.
     * @returns {Promise<{data: Array<Object>|null, error: Object|null}>} The inserted row(s) returned by Supabase, or an error.
     */
    const addNote = async (title, content, tags) => {
        const { data, error } = await supabase
          .from('notes')
          .insert([{ title, content, tags, user_id: user.id }])
          .select();
        if (!error) setNotes((prev) => [...prev, ...data]);
        return { data, error };
      };    

    /**
     * Fetches all notes belonging to the current user and stores them in state.
     * No-ops if there is no authenticated user. Toggles `loading` while the
     * request is in flight.
     *
     * @function
     * @returns {Promise<void>} Resolves once notes have been fetched and state updated.
     */
    const getNotes = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('notes')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', {ascending: false});
        if (!error) setNotes(data);
        setLoading(false);
    }, [user]);


    /**
     * Fetches the most recently created note belonging to the current user.
     *
     * The function queries the `notes` table in Supabase, filters by the
     * authenticated user's ID, and orders the results by creation date
     * in descending order. Only the latest note is returned.
     *
     * @async
     * @function getRecentNote
     * @returns {Promise<{data: Array, error: Object|null}|undefined>}
     *   A promise that resolves to the Supabase response containing the
     *   fetched note data and any error. Returns undefined if no user
     *   is authenticated.
     *
     * @example
     * const getRecentNote = async () => { 
     *    const result = await getRecentNote();
     *    if (result?.data) {
     *      console.log('Recent note:', result.data[0]);
     *    }
     * }
     *
     */
    const getRecentNote = async () => {
      if (!user) return;
    
      setLoading(true);
    
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);
    
      if (!error) return { data, error };
    
      setLoading(false);
    };


    /**
     * Fetches a single note from the 'notes' table by its ID.
     *
     * @async
     * @function getNoteById
     * @param {string|number} id - The unique identifier of the note to retrieve.
     * @returns {Promise<{data: Array<Object>|null, error: Object|null}>} An object containing:
     *   - `data`: An array with the matching note (or empty if not found), or `null` if an error occurred.
     *   - `error`: An error object if the query failed, or `null` on success.
     *
     * @example
     * const { data, error } = await getNoteById('123');
     * if (error) {
     *   console.error('Failed to fetch note:', error);
     * } else {
     *   console.log('Note:', data[0]);
     * }
     */
    const getNoteById = useCallback(async (id) => {
      const { data, error } = await supabase
        .from('notes')
        .select()
        .eq('id', id)
        .single();
      return { data, error };
    }, [id]);

    /**
     * Updates a note by id, applying an optimistic update to local state
     * immediately, then syncing with Supabase. Rolls back to the previous
     * state if the update fails.
     *
     * @param {string|number} id - The id of the note to update.
     * @param {Object} updates - Partial fields to merge into the note (e.g. `{ title, content }`).
     * @returns {Promise<{data: Object|null, error: Object|null}>} The updated row from Supabase, or an error.
     */
    const updateNote = async (id, updates) => {
        const prevNotes = notes;
        // update UI immediately
        setNotes((prev) =>
          prev.map((note) => (note.id === id ? { ...note, ...updates } : note))
        );
      
        const { data, error } = await supabase
          .from('notes')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
      
        if (error) {
          setNotes(prevNotes); // rollback
        } else {
          setNotes((prev) => prev.map((note) => (note.id === id ? data : note)));
        }
      
        return { data, error };
    };

    /**
     * Deletes a note by id and removes it from local state on success.
     *
     * @param {string|number} noteId - The id of the note to delete.
     * @returns {Promise<{data: Array<Object>|null, error: Object|null}>} The deleted row(s) returned by Supabase, or an error.
     */
    const deleteNote = async (noteId) => {
        const { data, error } = await supabase
            .from('notes')
            .delete()
            .eq('id', noteId)
            .select();
        
        if(!error) setNotes(notes.filter(note => note.id !== noteId));
        return { data, error }
    }

  const value = { notes, totalNotes: notes.length, loading, getNotes, getRecentNote,  getNoteById, addNote, deleteNote, updateNote };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

/**
 * Hook for consuming the data context. Must be called from a component
 * rendered within a `DataProvider`.
 *
 * @returns {{
 *   notes: Array<Object>,
 *   loading: boolean,
 *   getNotes: () => Promise<void>,
 *   addNote: (title: string, content: string) => Promise<{data: Array<Object>|null, error: Object|null}>,
 *   deleteNote: (noteId: string|number) => Promise<{data: Array<Object>|null, error: Object|null}>,
 *   updateNote: (id: string|number, updates: Object) => Promise<{data: Object|null, error: Object|null}>
 * }} The data context value.
 * @throws {Error} If used outside of a `DataProvider`.
 */
export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}