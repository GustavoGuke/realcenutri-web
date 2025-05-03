
type Props = {
    children: string
}
export const Header = ({children}:Props) => {
    return (
        <h1 className="text-2xl font-bold text-center my-3 text-teal-600">{children}</h1>
    )
}