import { Button } from "@/components/ui/button"

interface IParams {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

const SubmitButton: React.FC<IParams> = ({
    label,
    onClick,
    variant,
}) => {
    return (
        <Button onClick={onClick} variant={variant ?? 'default'}>
            {label}
        </Button>
    )
}
    
export default SubmitButton;