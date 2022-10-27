import React from 'react';
import { useEffect,useState } from 'react';
import styles from './createvideogame.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, postVideogame, getGenres } from '../../Redux/Actions';
import { Link } from 'react-router-dom';
import validate from './validate';

function Createvideogame() {
    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres);
    const videogames = useSelector((state) => state.videogames);
    useEffect(() => {
        dispatch(getVideogames());
        if (genres.length === 0) {
            dispatch(getGenres());
        }
    }, [dispatch, genres.length]);

    let platformsList = [];
    function removeDuplicates(arr) {
        var unique = [];
        arr.forEach(element => {
            if (!unique.includes(element)) {
                unique.push(element);
            }
        });
        return unique;
    }
    if (videogames.length >= 1) {
        videogames.map((game) => (
            platformsList.push(game.platforms)
        ))
    }
    platformsList = platformsList.toString().split(', ').toString().split(',')
    platformsList = removeDuplicates(platformsList)

    const [form, setForm] = useState({
        name: "",
        description: "",
        platforms: [],
        genres: [],
        rating: "",
        released: "",
        img: ""
    });

    const [formErrors, setFormErrors] = useState({}) 

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    function handleGenres(e) {
        setForm({
            ...form,
            genres: [...form.genres.filter(g => g !== e.target.value), e.target.value],
        });
    }
    function handlePlatforms(e) {
        setForm({
            ...form,
            platforms: [...form.platforms.filter(p => p !== e.target.value), e.target.value],
        });
    }
    function handleGenresDelete(genre) {
        setForm({
            ...form,
            genres: form.genres.filter(g => g !== genre)
        });
    }
    function handlePlatformsDelete(platform) {
        setForm({
            ...form,
            platforms: form.platforms.filter(p => p !== platform)
        });
    }

    const [isSubmit, setIsSubmit] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(form))
        dispatch(postVideogame(form))
        setIsSubmit(true)
    }

    const [isCreated, setIsCreated] = useState(false);
    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(form)
            setIsCreated(true)
            setForm({})
        }
    }, [formErrors, form, isSubmit])

    return (
        
        <div className={styles.container}>
            <Link to='/home'>
                <button className={styles.text}>HOME</button>
            </Link>
            <div className={styles.createVideogame}>
                <h2>Create videogame</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Name*'
                        className={styles.inputs}
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                    />
                    {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}
                    <textarea
                        type="text"
                        placeholder='Description*'
                        className={styles.inputs}
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                    />
                    {formErrors.description && <p className={styles.error}>{formErrors.description}</p>}
                    <div>
                        <select onChange={handleGenres}>
                            <option value='null'>Genres</option>
                            {
                                genres.length < 18
                                    ? <option>Cargando...</option>
                                    : genres.length >= 1
                                        ? genres.map((genre) => {
                                            return (
                                                <option key={genre.id} name='genres' value={genre.name} >
                                                    {genre.name}
                                                </option>
                                            )
                                        })
                                        : null
                            }
                        </select>
                    </div>
                    <div className={styles.added}>
                        {
                            form.genres ? form.genres.map(genre => (
                                <span className={styles.added}>
                                    {genre}
                                    <button onClick={() => handleGenresDelete(genre)}>X</button>
                                </span>
                            )) : null
                        }
                    </div>
                    <div>
                        <select onChange={handlePlatforms}>
                            <option value='null'>Platforms*</option>
                            {
                                platformsList.length < 18
                                    ? <option>Cargando...</option>
                                    : platformsList.length >= 1
                                        ? platformsList.map((platform) => {
                                            return (
                                                <option key={platform} name='platforms' value={platform} >
                                                    {platform}
                                                </option>
                                            )
                                        })
                                        : null
                            }
                        </select>
                    </div>
                    <div className={styles.added}>
                        {
                            form.platforms ? form.platforms.map(platform => (
                                <span className={styles.added}>
                                    {platform}
                                    <button onClick={() => handlePlatformsDelete(platform)}>X</button>
                                </span>
                            )) : null
                        }
                    </div>
                    {formErrors.platforms && <p className={styles.error}>{formErrors.platforms}</p>}
                    <input
                        type='number'
                        placeholder='rating'
                        min='0'
                        max='5'
                        className={styles.inputs}
                        name='rating'
                        value={form.rating}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        placeholder='Released date'
                        className={styles.inputs}
                        name='released'
                        value={form.released}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder='Insert image URL'
                        className={styles.inputs}
                        name='img'
                        value={form.img}
                        onChange={handleChange}
                    />
                    {formErrors.img && <p className={styles.error}>{formErrors.img}</p>}
                    <input type="submit" value='Create' className={styles.btn} />
                </form>
                {
                    isCreated ? <span className={styles.created}>✔ Videogame created!</span> : null
                }
            </div >
            
        </div >
    )
}


export default Createvideogame;