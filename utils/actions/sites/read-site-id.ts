"use server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const readSiteById = async (site_id: string) => {
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
      .from("sites")
      .select()
      .eq("site_id", site_id);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
