import LoginPage from "@/auth/LoginPage";
import ProtectedRoute from "@/auth/ProtectedRoute";
import { AppProvider } from "@/context/AppContext";
import OverviewPage from "@/features/overview/OverviewPage";
import Root from "@/ui/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

const applicationRouter = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Navigate to="/overview" replace />,
            },
            {
                path: "/overview",
                element: (
                    <ProtectedRoute>
                        <OverviewPage />
                    </ProtectedRoute>
                ),
            },
            // {
            //   path: "/budgets"
            //   element: <ProtectedRoute>
            //     <BudgetsPage />
            //   </ProtectedRoute>
            // },
            // {
            //   path: "/accounts"
            //   element: <ProtectedRoute>
            //     <AccountsPage />
            //   </ProtectedRoute>
            // },
            // {
            //   path: "/journal"
            //   element: <ProtectedRoute>
            //     <JournalPage />
            //   </ProtectedRoute>
            // },
            // {
            //   path: "/balance-sheet"
            //   element: <ProtectedRoute>
            //     <BalancSheetPage />
            //   </ProtectedRoute>
            // },
            // {
            //   path: "/income-stament"
            //   element: <ProtectedRoute>
            //     <IncomeStamentPage />
            //   </ProtectedRoute>
            // },
            // {
            //   path: "/terms-of-use",
            //   element: <TermsOfUse />,
            // },
            // {
            //   path: "/privacy-policy",
            //   element: <PrivacyPolicy />,
            // },

            // {
            //   path: "/signup",
            //   element: <SignUp />,
            // },

            // {
            //   path: "/reset-password",
            //   element: <ResetPassword />,
            // },
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
]);

const client = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0 * 1000,
        },
    },
});

function App() {
    return (
        <AppProvider>
            <QueryClientProvider client={client}>
                <ReactQueryDevtools initialIsOpen={false} />
                <RouterProvider router={applicationRouter} />
                <Toaster
                    position="bottom-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: { duration: 3000 },
                        error: { duration: 5000 },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "white",
                            color: "var(--bl-text-gray)",
                        },
                    }}
                />
            </QueryClientProvider>
        </AppProvider>
    );
}

export default App;
