export default function skillCount(data: { skills: string[] }[]) {
    const skillSet = new Set<string>();
    data.forEach((item) => {
        item.skills.forEach((skill: string) => {
            skillSet.add(skill);
        });
    });
    return skillSet.size;
}