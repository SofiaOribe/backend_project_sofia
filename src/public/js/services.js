/* global io, document, window, alert */
const serviceForm = document.querySelector("#service-form")
const formMessage = document.querySelector("#form-message")

if (serviceForm && formMessage) {
  serviceForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const submitButton = serviceForm.querySelector('button[type="submit"]')

    const formData = new FormData(serviceForm)

    const newService = {
      name: formData.get("name").trim(),
      description: formData.get("description").trim(),
      duration: Number(formData.get("duration")),
      price: Number(formData.get("price")),
      category: formData.get("category").trim(),
      available: formData.has("available"),
    }

    submitButton.disabled = true
    formMessage.textContent = ""

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || result.error || "No se pudo crear el servicio.")
      }

      serviceForm.reset()

      window.location.reload()
    } catch (error) {
      console.error("Error al crear el servicio:", error)
      formMessage.textContent = error.message
    } finally {
      submitButton.disabled = false
    }
  })
}

// Actualizar precio
document.addEventListener("click", async (event) => {
  const button = event.target.closest(".save-price-button")

  if (!button) return

  const row = button.closest("[data-service-id]")
  const id = row.dataset.serviceId
  const priceInput = row.querySelector(".price-input")
  const price = Number(priceInput.value)

  if (priceInput.value.trim() === "" || !Number.isFinite(price) || price < 0) {
    alert("Ingresá un precio válido.")
    return
  }

  button.disabled = true

  try {
    const response = await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(result.message || result.error || "No se pudo actualizar el precio.")
    }

    window.location.reload()
  } catch (error) {
    alert(error.message)
    button.disabled = false
  }
})

// Actualizar disponibilidad
document.addEventListener("change", async (event) => {
  const checkbox = event.target

  if (!checkbox.matches(".availability-input")) return

  const row = checkbox.closest("[data-service-id]")
  const id = row.dataset.serviceId
  const label = checkbox.nextElementSibling
  const newAvailability = checkbox.checked

  checkbox.disabled = true

  try {
    const response = await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        available: newAvailability,
      }),
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(result.message || result.error || "No se pudo actualizar la disponibilidad.")
    }

    window.location.reload()
  } catch (error) {
    checkbox.checked = !newAvailability
    alert(error.message)
  } finally {
    checkbox.disabled = false

    if (label) {
      label.textContent = checkbox.checked ? "Disponible" : "No disponible"
    }
  }
})

// Eliminar servicio
document.addEventListener("click", async (event) => {
  const button = event.target.closest(".delete-service-button")

  if (!button) return

  const row = button.closest("[data-service-id]")
  const id = row.dataset.serviceId
  const serviceName = row.querySelector(".service-name").textContent.trim()

  const confirmed = window.confirm(`¿Seguro que querés borrar el servicio "${serviceName}"?`)

  if (!confirmed) return

  button.disabled = true

  try {
    const response = await fetch(`/api/services/${id}`, {
      method: "DELETE",
    })

    const result = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(result.message || result.error || "No se pudo eliminar el servicio.")
    }

    window.location.reload()
  } catch (error) {
    alert(error.message)
    button.disabled = false
  }
})
