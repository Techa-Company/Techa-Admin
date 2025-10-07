// src/services/spClient.js

/**
 * Executes a stored procedure on the .NET backend and returns the parsed JSON response.
 * @param {string} procedureName - The name of the stored procedure to execute.
 * @param {Object} parameters - Optional object of parameters with @ prefix.
 * @param {boolean} hasDataTable - Whether the response includes a Dataset.
 * @returns {Promise<Object>} The JSON-decoded response object with a normalized Dataset array.
 */

export async function SP_fetch(procedureName, parameters = {}, hasDataTable = true) {
    // const url = process.env.NEXT_PUBLIC_API_BASE_URL
    //     ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/ExecuteTSql/ExecuteStoredProcedure`
    //     : "https://localhost:7180/api/ExecuteSqlCommand/ExecuteStoredProcedureWithDebugger";

    const url = "https://pool.techa.me/api/ExecuteTSql/ExecuteStoredProcedure";

    const body = {
        ProcedureName: procedureName,
        ProjectId: 1010,
        HasDataTable: hasDataTable,
    };

    if (Object.keys(parameters).length > 0) {
        const formattedParams = {};
        for (const [key, value] of Object.entries(parameters)) {
            const formattedKey = key.startsWith("@") ? key : `@${key}`;
            formattedParams[formattedKey] = value.toString();
        }
        body.Parameters = formattedParams;
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`HTTP ${response.status} - ${text}`);
    }

    const data = await response.json();

    let ds = data?.Data?.Dataset;
    if (typeof ds === "string") {
        try {
            ds = JSON.parse(ds);
        } catch {
            ds = [];
        }
    }
    if (!Array.isArray(ds)) ds = [];

    return {
        ...data,
        Data: {
            ...data.Data,
            Dataset: ds,
        },
    };
}