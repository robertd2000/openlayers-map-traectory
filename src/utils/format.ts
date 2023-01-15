export const formatCoordinate = (coordinate: number[]) => {
  return `
      <table>
        <tbody>
          <tr><th>lon</th><td>${coordinate[0].toFixed(2)}</td></tr>
          <tr><th>lat</th><td>${coordinate[1].toFixed(2)}</td></tr>
        </tbody>
      </table>`
}
