export const slugify = (text: string) => {
  return text
    .toLowerCase() // Ubah ke huruf kecil
    .replace(/\s+/g, "-") // Ganti spasi dengan tanda hubung
    .replace(/[^\w-]+/g, ""); // Hapus karakter khusus
};
