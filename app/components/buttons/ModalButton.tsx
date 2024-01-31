import { Button } from "@/components/ui/button"

interface IParams {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    disabled?: boolean;
}

const ModalButton: React.FC<IParams> = ({
    label,
    onClick,
    variant,
    disabled,
}) => {
    return (
        <Button onClick={onClick} variant={variant ?? 'secondary'} disabled={disabled}>
            {label}
        </Button>
    )
}
    
export default ModalButton;