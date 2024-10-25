"use server"
import { auth } from "@clerk/nextjs/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const readSites = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }
  const cookieStore = cookies();

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

  try {
    const { data, error } = await supabase
      .from("sites")
      .select()
      .eq("user_id", userId);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    return error;
  }
};
