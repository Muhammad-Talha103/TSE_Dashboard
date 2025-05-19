import { getCreditTokens, getTSEsForToken } from "@/utils/lib";
import TokenTable from "./Token-Table";
import TokenTableResponsive from "./Token-Table-Responsive";
import { Token } from "@/types/types";

const CreditTokenDashboard = async () => {
  const tokens: Token[] = await getCreditTokens();

  const enrichedTokens = await Promise.all(
    tokens.map(async (token) => {
      let tses: any[] = [];
      if (token.creditClientId) {
        tses = await getTSEsForToken(token.creditClientId);
      }
      const tseSerialNumbers = tses.map((tse: any) => tse.tseSerialNumber);
      const productTypes = tses.map((tse: any) => tse.productType);
      return {
        ...token,
        tseCount: tses.length,
        tseSerialNumbers,
        productTypes, 
      };
    })
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Credit Tokens</h1>
      </div>
      <TokenTableResponsive tokens={enrichedTokens} />
      <TokenTable tokens={enrichedTokens} />
    </div>
  );
};

export default CreditTokenDashboard;
