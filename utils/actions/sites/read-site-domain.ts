"use server";
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const readSiteDomain = async (domain: string) => {
  const cookieStore = cookies();

  console.error(process.env.SUPABASE_URL);


  const supabase = createServerClient(
    "https://djianwxjguwwcjilgvqj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqaWFud3hqZ3V3d2NqaWxndnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzOTQ1OTcsImV4cCI6MjAzNjk3MDU5N30.FZifotz8sMfjqXZ3mvaPXElf41GGyUtCK56BIakk6GA",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // middleware
  try {
    const { data, error } = await supabase
      .from("sites")
      .select()
      .eq("site_subdomain", domain);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
