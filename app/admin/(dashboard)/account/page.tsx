import { createClient } from "@/lib/supabase/server";
import { AccountForm } from "@/components/admin/AccountForm";

export default async function AdminAccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm email={user?.email ?? ""} />;
}
