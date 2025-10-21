import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "0"); // page index
  const limit = parseInt(searchParams.get("limit") || "12");
  const query = searchParams.get("query") || "";

  let supabaseQuery = supabase
    .from("artists")
    .select("*")
    .order("created_at", { ascending: false })
    .range(page * limit, page * limit + limit - 1);

  if (query) {
    supabaseQuery = supabaseQuery.ilike("name", `%${query}%`);
  }

  const { data, error } = await supabaseQuery;

  if (error) {
    return NextResponse.json(
      { data: [], error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ data, error: null });
}
