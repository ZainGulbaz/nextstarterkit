import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const getAllDocuments = async (site_id: string) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.SUPABASE_URL+"",
    process.env.SUPABASE_SECRET_KEY+"",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("site_id", site_id)
      .eq("user_id", userId);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
