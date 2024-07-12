import { MainSectionChildren } from '../../types/type'


const MainSection = (props: MainSectionChildren) => {
    return (
        <section className='px-[12px]'>
            {props.children}
        </section>
    )
}

export default MainSection
