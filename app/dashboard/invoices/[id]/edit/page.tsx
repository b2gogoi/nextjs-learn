import Form from "@/app/ui/invoices/edit-form";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { useSearchParams, usePathname, notFound } from "next/navigation";

export default async function Page( props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    // const customers = await fetchCustomers();
    const id = params.id;

    const [ invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers()
    ]);

    if (!invoice) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs breadcrumbs={[
                { label: 'Invoices', href: '/dashboard/invoices'},
                { label: 'Edit Invoice', href: `/dashboard/invoices/${id}`, active: true }
            ]}/>
            <Form customers={customers} invoice={invoice} />
        </main>
    )
}