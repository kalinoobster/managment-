
'use server';
/**
 * @fileOverview A sales report generation AI agent.
 *
 * - generateReport - A function that handles the sales report generation process.
 * - GenerateReportInput - The input type for the generateReport function.
 * - GenerateReportOutput - The return type for the generateReport function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { Order } from '@/lib/types';


const OrderSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  date: z.string(),
  total: z.number(),
  status: z.enum(['Delivered', 'Shipped', 'Processing', 'Cancelled']),
  productName: z.string(),
  quantity: z.number(),
  price: z.number(),
  cost: z.number(),
});


export const GenerateReportInputSchema = z.object({
  period: z.enum(['monthly', 'yearly']),
  orders: z.array(OrderSchema),
  totalRevenue: z.number(),
  totalCost: z.number(),
  totalProfit: z.number(),
  profitMargin: z.number(),
  mostSoldItem: z.string(),
  mostProfitableItem: z.string(),
});
export type GenerateReportInput = z.infer<typeof GenerateReportInputSchema>;

export const GenerateReportOutputSchema = z.object({
  salesSummary: z.string().describe("A summary of the sales performance for the period."),
  performanceAnalysis: z.string().describe("An analysis of the key performance indicators like revenue, profit, and top products."),
  recommendations: z.string().describe("Actionable recommendations based on the sales data to improve performance."),
});
export type GenerateReportOutput = z.infer<typeof GenerateReportOutputSchema>;

export async function generateReport(input: GenerateReportInput): Promise<GenerateReportOutput> {
  return generateReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateReportPrompt',
  input: { schema: GenerateReportInputSchema },
  output: { schema: GenerateReportOutputSchema },
  prompt: `You are an expert business analyst. Your task is to generate a concise sales report based on the provided data.

  Analyze the following data for the {{period}} period:
  - Total Revenue: \${{totalRevenue}}
  - Total Cost of Goods Sold: \${{totalCost}}
  - Total Profit: \${{totalProfit}}
  - Profit Margin: {{profitMargin}}%
  - Best Selling Product (by quantity): {{mostSoldItem}}
  - Most Profitable Product: {{mostProfitableItem}}
  - Orders Data:
    \`\`\`json
    {{{json stringify=orders}}}
    \`\`\`

  Based on this data, provide:
  1.  **Sales Summary**: A brief overview of the sales activity during the period.
  2.  **Performance Analysis**: Analyze the financial performance, highlighting the key drivers (like top products) and any trends you notice in the order data.
  3.  **Recommendations**: Provide two to three actionable recommendations for the business owner to improve sales, profitability, or inventory management.
  `,
});

const generateReportFlow = ai.defineFlow(
  {
    name: 'generateReportFlow',
    inputSchema: GenerateReportInputSchema,
    outputSchema: GenerateReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate report from AI.");
    }
    return output;
  }
);

    