export function scarcityText(count: number) {
  return `Lote atual: ${count} ${count === 1 ? "peça disponível" : "peças disponíveis"}`;
}
