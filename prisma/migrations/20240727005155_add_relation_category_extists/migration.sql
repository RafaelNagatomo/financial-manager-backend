-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "Categories"("category_name") ON DELETE SET NULL ON UPDATE CASCADE;
