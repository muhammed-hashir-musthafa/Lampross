export const parseFilterOptions = (query) => {
  const {
    type,
    category,
    city,
    builtUpArea,
    layout,
    minPrice,
    maxPrice,
    sortBy,
    page,
    limit,
  } = query;

  const filter = {};
  if (type) filter.style = type;
  if (category) filter.category = category;
  if (city) filter.city = city;
  if (builtUpArea) filter.builtUpArea = builtUpArea;
  if (layout) filter.layout = layout;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sortOptions = {
    featured: { tags: -1 },
    priceLowToHigh: { price: 1 },
    priceHighToLow: { price: -1 },
  };

  return {
    filter,
    sort: sortOptions[sortBy] || {},
    page: Number(page) || 1,
    limit: Number(limit) || 12,
  };
};
