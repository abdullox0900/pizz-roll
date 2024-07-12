import { MainSectionChildren } from '../../types/type'


const MainSection = (props: MainSectionChildren) => {
    return (
        <section className={`${props.sectionClass} px-[12px]`}>
            {props.children}
        </section>
    )
}

export default MainSection
