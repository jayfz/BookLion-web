import { BasicLedgerEntry, LedgerEntry } from "@/types/account";

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function formatDate(date: Date, formatStyle: "short" | "shorter") {
    if (formatStyle == "short") {
        const month = date.toLocaleString("default", { month: "short" });
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day}, ${year}`;
    }

    if (formatStyle == "shorter") {
        const month = padNumbersLessThan10(date.getMonth() + 1);
        const day = padNumbersLessThan10(date.getDate());

        return `${month}/${day}`;
    }
}

function padNumbersLessThan10(num: number) {
    if (num < 10) return `0${num}`;
    else return num.toString();
}

export function formatCurrency(amount: string, formatStyle: "full" | "short" | "shorter" | "shortest") {
    const formattedAmount = currencyFormatter.format(amount as unknown as number);
    if (formatStyle == "short") {
        return formattedAmount.split(".")[0];
    }
    if (formatStyle == "shorter") {
        const parts = formattedAmount.split(",");

        if (parts.length == 2) return `${parts[0]}k`;
        if (parts.length >= 3) {
            parts.pop();
            parts.pop();
            return `${parts.join(",")}m`;
        }

        return formattedAmount;
    }

    if (formatStyle == "shortest") {
        const amountInUnitsOfThousands = parseFloat(amount) / 1000;
        console.log(amountInUnitsOfThousands);

        const amountWithFormat = currencyFormatter.format(amountInUnitsOfThousands).replace("$", "");

        if (amountWithFormat == "0.00" && amountInUnitsOfThousands > 0) {
            return "0.01";
        }
        return amountWithFormat;
    }
}

// export function formatLedgerAmount(entry: LedgerEntry | BasicLedgerEntry) {
//     let result: string = "";

//     switch (entry.accountType) {
//         case "ASSETS":
//         case "LIABILITIES":
//         case "EQUITY":
//             result = entry.credits != "0.00" ? `-${entry.credits}` : entry.debits;
//             break;
//         case "EXPENSES":
//         case "REVENUE":
//             result = entry.debits != "0.00" ? `-${entry.debits}` : entry.credits;
//             break;
//     }

//     return formatCurrency(result, "shortest");
// }

export function formatVariation(variation: string) {
    const negativeSymbol = "-";
    if (variation.startsWith(negativeSymbol)) return variation.substring(1);

    return variation;
}
