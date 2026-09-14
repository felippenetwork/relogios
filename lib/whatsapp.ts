export function waLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function waLinkFor(number: string, productName: string) {
  return waLink(number, `Olá! Tenho interesse em: ${productName}`);
}
