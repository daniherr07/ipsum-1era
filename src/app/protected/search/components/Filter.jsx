import styles from './Filter.module.css'


export default function Filter({ordenarData}){


    return(
        <>

        <form className={styles.form} action="" method="post">
            <select className={styles.select} name="" id="">
                <option value="">Ordenar por:</option>
                <option value="">Nombre</option>
                <option value="">Fecha</option>
            </select>

            <select className={styles.select} name="" id="">
                <option value="">Ascendente</option>
                <option value="">Descendente</option>
            </select>

            
        </form>
        <button className={styles.submit} onClick={ordenarData}>Filtrar</button>


        

        </>
    )

}