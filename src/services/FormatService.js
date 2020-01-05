export function antall(number, decimals) {
  if (typeof decimals == "number") {
    number = number.toFixed(decimals)
  } else {
    // never show more than 4 decimals
    number = Math.round(number * 10000) / 10000
  }

  const x = (number + "").split(".")
  let x1 = x[0]
  const x2 = x.length > 1 ? "," + x[1] : ""
  const rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + " " + "$2")
  }

  return x1 + x2
}

export function price(amount, decimals, inNok) {
  if (typeof decimals == "boolean") {
    inNok = decimals
    decimals = 0
  }

  decimals = decimals || 0

  if (decimals == 0 && amount.toFixed(0) != amount) {
    decimals = 2
  }

  function formatNumber(number, decimals) {
    number = number.toFixed(decimals) + ""
    const x = number.split(".")
    let x1 = x[0]
    const x2 = x.length > 1 ? "," + x[1] : ""
    const rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + " " + "$2")
    }
    return x1 + x2
  }

  if (typeof decimals != "number") decimals = 0
  return (inNok ? "NOK " : "kr ") + formatNumber(parseFloat(amount), decimals)
}
