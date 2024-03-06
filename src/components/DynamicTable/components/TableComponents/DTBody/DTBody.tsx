type Props = {children: JSX.Element | JSX.Element[]}

const DTBody = ({children}: Props) => {
  return (
    <tbody>{children}</tbody>
  )
}

export default DTBody