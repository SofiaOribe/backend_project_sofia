/* global document, window, alert */

// Crear booking sin servicios
const bookingForm = document.querySelector("#booking-form")

if (bookingForm) {
  const message = document.querySelector("#booking-form-message")

  bookingForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const submitButton = bookingForm.querySelector('button[type="submit"]')

    const booking = {
      clientName: bookingForm.elements.clientName.value.trim(),
      clientEmail: bookingForm.elements.clientEmail.value.trim(),
      date: bookingForm.elements.date.value,
      time: bookingForm.elements.time.value,
      status: bookingForm.elements.status.value,
    }

    submitButton.disabled = true
    message.textContent = ""

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || result.error || "No se pudo crear el booking.")
      }

      window.location.reload()
    } catch (error) {
      message.textContent = error.message
    } finally {
      submitButton.disabled = false
    }
  })
}

// Mostrar el selector de servicios
document.addEventListener("click", (event) => {
  const button = event.target.closest(".add-service-button")

  if (!button) return

  const actions = button.closest(".booking-actions")
  const controls = actions.querySelector(".add-service-controls")

  button.disabled = true
  controls.style.display = "block"
})

// Cancelar la selección
document.addEventListener("click", (event) => {
  const button = event.target.closest(".cancel-add-service-button")

  if (!button) return

  const actions = button.closest(".booking-actions")
  const controls = actions.querySelector(".add-service-controls")
  const addButton = actions.querySelector(".add-service-button")
  const select = actions.querySelector(".add-service-select")

  select.selectedIndex = 0
  controls.style.display = "none"
  addButton.disabled = false
})

// Confirmar y agregar el servicio
document.addEventListener("click", async (event) => {
  const button = event.target.closest(".confirm-add-service-button")

  if (!button) return

  const actions = button.closest(".booking-actions")
  const addButton = actions.querySelector(".add-service-button")
  const bookingId = addButton.dataset.bookingId
  const select = actions.querySelector(".add-service-select")
  const serviceId = select.value

  if (!serviceId) {
    alert("Seleccioná un servicio.")
    return
  }

  button.disabled = true

  try {
    const response = await fetch(`/api/bookings/${bookingId}/services/${serviceId}`, {
      method: "POST",
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || result.error || "No se pudo agregar el servicio.")
    }

    window.location.reload()
  } catch (error) {
    alert(error.message)
    button.disabled = false
  }
})

// Eliminar booking
document.addEventListener("click", async (event) => {
  const button = event.target.closest(".delete-booking-button")

  if (!button) return

  const bookingId = button.dataset.bookingId

  if (!bookingId) {
    alert("No se encontró el ID del booking.")
    return
  }

  const confirmed = window.confirm("¿Estás segura de que querés eliminar este booking?")

  if (!confirmed) return

  button.disabled = true

  try {
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: "DELETE",
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(result.message || result.error || "No se pudo eliminar el booking.")
    }

    window.location.reload()
  } catch (error) {
    alert(error.message)
    button.disabled = false
  }
})
