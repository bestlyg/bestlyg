export async function sleep(t = 1000) {
  return new Promise((r) => {
    setTimeout(r, t)
  })
}
