import { Button } from "@/components/ui/button"

interface IParams {
    label: string;
    onClick: () => void;
}

const ClearButton: React.FC<IParams> = ({
    label,
    onClick
}) => {
    return (
        <Button variant='outline' onClick={onClick}>{label}</Button>
    )
}

export default ClearButton;