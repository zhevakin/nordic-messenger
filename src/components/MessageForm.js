import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'


function MessageForm({ onFormSubmit }) {
  const { register, handleSubmit, getValues, setValue, formState } = useForm({
    mode: 'onChange',
  })

  const onSubmit = (data) => {
    onFormSubmit(data)
    setValue('text', '')
  }

  const handleInsertEmoji = () => {
    const text = getValues('text')
    setValue('text', `${text}😅`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
          <textarea
            className="form-control"
            cols="30"
            rows="5"
            placeholder="Ваше сообщение"
            {...register('text', { required: true })}
          />
      </div>
      <button className="btn btn-primary" type="submit" disabled={!formState.isValid}>Отправить</button>
      <button className="btn" type="button" onClick={handleInsertEmoji}>😅</button>
    </form>
  )
}

MessageForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

export default MessageForm
