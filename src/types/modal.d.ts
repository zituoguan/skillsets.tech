export default interface ModalProps {
    skill: string;
    count: number;
    skillRanks: Record<string, number> | null;
    skillPositions: Record<string, string[]> | null;
    skillUp: [string, number] | null;
    skillDown: [string, number] | null;
    skillMonths: Record<string, Record<string, number>> | null;
    onClose: () => void;
}