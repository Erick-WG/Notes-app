import { AuthProvider } from "@utils/provider/AuthProvider";
import { DataProvider } from "@utils/provider/DataProvider";

export const AppProvider = ({children}) => {
    return (
        <AuthProvider>
            <DataProvider>
                {children}
            </DataProvider>
        </AuthProvider>
    )
}