import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryslug = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");
    const active = searchParams.get("active");

    const where: any = {};
    
    if (categoryslug) {
      where.category = { slug: categoryslug };
    }
    if (featured === "true") {
      where.featured = true;
    }
    if (active === "true") {
      where.active = true;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } }
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { order: "asc" },
      include: {
        category: { select: { name: true, slug: true } },
        images: { orderBy: { order: "asc" } },
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

    const body = await req.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Auto-generate slug
    if (!data.slug) {
      const { slugify } = await import("@/lib/utils");
      data.slug = slugify(data.name);
    }

    const existing = await prisma.product.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json({ error: "Slug já em uso" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        richContent: data.richContent,
        price: data.price,
        priceOnRequest: data.priceOnRequest,
        sku: data.sku,
        featured: data.featured,
        active: data.active,
        order: data.order,
        categoryId: data.categoryId,
        tags: data.tags,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
