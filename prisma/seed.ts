import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "hubex@admin2024",
    12
  );
  await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@hubex.com.br" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@hubex.com.br",
      password: hashedPassword,
      name: process.env.ADMIN_NAME || "Administrador",
      role: "ADMIN",
    },
  });

  // Site settings
  await prisma.siteSettings.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      companyName: "Hubex",
      whatsappNumber: "5511999999999",
      email: "contato@hubex.com.br",
      phone: "+55 11 9999-9999",
      address: "São Paulo, SP — Brasil",
      heroTitle: "Soluções em importação para o seu negócio evoluir",
      heroSubtitle:
        "Conectamos sua empresa às melhores marcas e fornecedores do mundo com qualidade, segurança e eficiência.",
    },
  });

  // Categories
  const cat1 = await prisma.category.upsert({
    where: { slug: "equipamentos-industriais" },
    update: {},
    create: {
      name: "Equipamentos Industriais",
      slug: "equipamentos-industriais",
      description: "Equipamentos e maquinários para uso industrial",
      active: true,
      order: 1,
    },
  });

  const cat2 = await prisma.category.upsert({
    where: { slug: "ferramentas" },
    update: {},
    create: {
      name: "Ferramentas",
      slug: "ferramentas",
      description: "Ferramentas manuais e elétricas de alta qualidade",
      active: true,
      order: 2,
    },
  });

  const cat3 = await prisma.category.upsert({
    where: { slug: "eletronicos" },
    update: {},
    create: {
      name: "Eletrônicos",
      slug: "eletronicos",
      description: "Componentes e equipamentos eletrônicos importados",
      active: true,
      order: 3,
    },
  });

  // Sample products
  await prisma.product.upsert({
    where: { slug: "compressor-industrial-5hp" },
    update: {},
    create: {
      name: "Compressor Industrial 5HP",
      slug: "compressor-industrial-5hp",
      description: "Compressor de ar industrial de alta performance, ideal para ambientes de produção exigentes.",
      price: 4850.0,
      sku: "EQ-001",
      featured: true,
      active: true,
      categoryId: cat1.id,
      order: 1,
    },
  });

  await prisma.product.upsert({
    where: { slug: "torno-automatico-cnc" },
    update: {},
    create: {
      name: "Torno Automático CNC",
      slug: "torno-automatico-cnc",
      description: "Torno CNC de precisão com controle computadorizado avançado.",
      priceOnRequest: true,
      sku: "EQ-002",
      featured: true,
      active: true,
      categoryId: cat1.id,
      order: 2,
    },
  });

  await prisma.product.upsert({
    where: { slug: "parafusadeira-de-impacto-pro" },
    update: {},
    create: {
      name: "Parafusadeira de Impacto PRO",
      slug: "parafusadeira-de-impacto-pro",
      description: "Parafusadeira de impacto profissional com torque de 280Nm e bateria de longa duração.",
      price: 890.0,
      sku: "FT-001",
      featured: false,
      active: true,
      categoryId: cat2.id,
      order: 1,
    },
  });

  await prisma.product.upsert({
    where: { slug: "controlador-de-temperatura-digital" },
    update: {},
    create: {
      name: "Controlador de Temperatura Digital",
      slug: "controlador-de-temperatura-digital",
      description: "Controlador PID de temperatura digital para processos industriais com precisão de ±0.1°C.",
      price: 320.0,
      sku: "EL-001",
      featured: true,
      active: true,
      categoryId: cat3.id,
      order: 1,
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
