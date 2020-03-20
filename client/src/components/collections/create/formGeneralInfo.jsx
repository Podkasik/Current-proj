import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  }
}))

function FormGeneral(props) {
  const classes = useStyles()
  return (
    <div>
        <form noValidate onSubmit={props.onSubmit.bind(this)}>
            <Paper className={classes.root}>
                <Typography variant="h6" component="h4" className='text-left'>
                    Название коллекции
                </Typography>
                <br/>
                <Typography component="p">
                    <input
                        type="text"
                        className="form-control "
                        name="name"
                        placeholder="Введите название коллекции"
                        onChange={props.onChange.bind(this)}
                    />
                </Typography>
            </Paper>
      <br/>
            <Paper className={classes.root}>
                <Typography variant="h6" component="h4" className='text-left'>
                    Описание коллекции
                </Typography>
                <br/>
                <Typography component="p">
                    <textarea
                        rows="4"
                        type="text"
                        className="form-control"
                        name="description"
                        placeholder="Введите описание коллекции"
                        onChange={props.onChange.bind(this)}
                    />
                </Typography>
            </Paper>
      <br/>
            <Paper className={classes.root}>
                <Typography variant="h6" component="h4" className='text-left'>
                    Тип коллекции
                </Typography>
                <br/>
                <Typography component="p">
                    <select className="form-control form-control-lg"  onChange={props.onChange.bind(this)} className="form-control"
                        name="subject">
                        <option >Марки</option>
                        <option >Открытки</option>
                        <option >Значки</option>
                        <option >Цветы</option>
                        <option >Бабочки</option>
                        <option >Книги</option>
                        <option >Другое</option>
                    </select>
                </Typography>
            </Paper>
            <br/>
            <Paper className={classes.root}>
                <Typography variant="h6" component="h4" className='text-left'>
                    Изображение коллекции
                </Typography>
                <br/>
                <Typography component="p">
                    <textarea
                        rows="4"
                        type="text"
                        className="form-control"
                        name="image"
                        placeholder="Выберите файл для загрузки изображения"
                        onChange={props.onChange.bind(this)}
                    />
                </Typography>
            </Paper>

            <button type="submit" className="btn btn-primary "> Создать </button>
            <button type="submit"  className="btn  btn-primary " onClick={ props.onSub.bind(this)}>   Назад  </button>
        </form>
    </div>
  )
}

 export default FormGeneral