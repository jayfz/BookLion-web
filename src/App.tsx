import LoginPage from "@/auth/LoginPage";
import ProtectedRoute from "@/auth/ProtectedRoute";
import { AppProvider } from "@/context/AppContext";
import BudgetDetailsPage from "@/features/budget/BudgetDetailsPage";
import BudgetOverviewPage from "@/features/budget/BudgetsOverviewPage";
import GeneralJournalPage from "@/features/general-journal/GeneralJournalPage";
import GeneralLedgerPage from "@/features/general-ledger/GeneralLedgerPage";
import OverviewDetailsPage from "@/features/overview/OverviewDetailsPage";
import OverviewPage from "@/features/overview/OverviewPage";
import BalanceSheetPage from "@/features/reports/BalanceSheetPage";
import IncomeStamentPage from "@/features/reports/IncomeStamentPage";
import MobileDrawer from "@/ui/MobileDrawer";
import Root from "@/ui/Root";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

const applicationRouter = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Root />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard/overview" replace />,
            },
            {
                path: "/dashboard",
                index: true,
                element: <Navigate to="/dashboard/overview" />,
            },
            {
                path: "/dashboard/overview",
                element: <OverviewPage />,
            },
            {
                path: "/dashboard/overview/assets",
                element: <OverviewDetailsPage />,
            },
            {
                path: "/dashboard/overview/liabilities",
                element: <OverviewDetailsPage />,
            },
            {
                path: "/dashboard/overview/equity",
                element: <OverviewDetailsPage />,
            },
            {
                path: "/dashboard/overview/revenue",
                element: <OverviewDetailsPage />,
            },
            {
                path: "/dashboard/overview/expenses",
                element: <OverviewDetailsPage />,
            },
            {
                path: "/dashboard/general-ledger/account/:accountId",
                element: <GeneralLedgerPage />,
            },
            {
                path: "/dashboard/general-journal/:transactionId",
                element: <GeneralJournalPage />,
            },
            {
                path: "/dashboard/budgets",
                element: <BudgetOverviewPage />,
            },
            {
                path: "/dashboard/budgets/:budgetId",
                element: <BudgetDetailsPage />,
            },
            {
                path: "/dashboard/reports/balance-sheet",
                element: <BalanceSheetPage />,
            },
            {
                path: "/dashboard/reports/income-statement",
                element: <IncomeStamentPage />,
            },
            {
                path: "/dashboard/ui/drawer",
                element: <MobileDrawer />,
            },

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
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
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
