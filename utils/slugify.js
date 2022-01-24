export default function slugify(stringToSlugify) {
  let slug = stringToSlugify.replace(/,/g, '-');
  slug = str.replace(/\s/g, '-');
  slug = slug.replace(/\s+/g, '-');
  slug = slug.replace(/&/g, "and")
  return slug;
}
