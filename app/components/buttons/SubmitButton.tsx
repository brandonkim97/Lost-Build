import { Button } from "@/components/ui/button"

interface IParams {
    label: string;
    onClick: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    disabled?: boolean;
}

const SubmitButton: React.FC<IParams> = ({
    label,
    onClick,
    variant,
    disabled,
}) => {
    return (
        <Button onClick={onClick} variant={variant ?? 'default'} disabled={disabled} className='w-full'>
            {label}
        </Button>
    )
}
    
export default SubmitButton;