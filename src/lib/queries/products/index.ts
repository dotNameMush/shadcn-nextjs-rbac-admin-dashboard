"use server";

import { db } from "@/lib/db";

export const getFilteredProductList = async ({
  page,
  take,
  filter,
}: {
  page: number;
  take: number;
  filter: any;
}) => {
  try {
    let where = filter;
    const skip = (page - 1) * take;
    const [products, totalCount] = await Promise.all([
      db.product.findMany({
        where,
        include: {
          Category: {
            select: {
              id: true,
              name: true,
            },
          },
          Tags: {
            select: {
              id: true,
              name: true,
            },
          },
          ProductStock: {
            include: {
              address: true,
            },
          },
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      db.product.count({ where }),
    ]);
    return {
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / take),
    };
  } catch (err) {
    throw err;
  }
};
