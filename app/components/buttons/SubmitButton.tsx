import { Button } from "@/components/ui/button"

interface IParams {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    disabled?: boolean;
    classes?: string;
}

const SubmitButton: React.FC<IParams> = ({
    label,
    onClick,
    variant,
    disabled,
    classes
}) => {
    return (
        <Button type='submit' onClick={onClick} variant={variant ?? 'default'} disabled={disabled} className={classes}>
            {label}
        </Button>
    )
}
    
export default SubmitButton;