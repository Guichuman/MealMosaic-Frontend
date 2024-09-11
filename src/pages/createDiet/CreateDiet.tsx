import styles from "./createDiet.module.css";
import React, { FormEvent, useState, useEffect } from "react";
import { setUpAPICLient } from "../../api/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { GiSpoon } from "react-icons/gi";

interface Client {
  id: string;
  name: string;
}

interface Alimento {
  id: string;
  name: string;
}
interface Food {
  id: string;
  name: string;
  quantity: string;
}

interface Meal {
  id: string;
  foods: Food[];
  time: string;
}

const CreateDiet: React.FC = () => {
  const apiClient = setUpAPICLient();
  const token = localStorage.getItem("Token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [alimentos, setAlimentos] = useState<Alimento[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        if (!token) {
          navigate("/");
          return;
        }
        const response = await apiClient.get(`/clientes/${userId}`);
        setClients(response.data.data);
      } catch (error) {}
    };

    const fetchAlimentos = async () => {
      try {
        const response = await apiClient.get("/alimento"); // Adjust the API endpoint accordingly
        setAlimentos(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar alimentos:", error);
      }
    };

    fetchClients();
    fetchAlimentos();
  }, []);

  const addMeal = () => {
    setMeals([...meals, { id: Date.now().toString(), foods: [], time: "" }]);
  };

  const addFoodToMeal = (mealIndex: number) => {
    const newMeals = meals.map((meal, index) =>
      index === mealIndex
        ? {
            ...meal,
            foods: [
              ...meal.foods,
              { id: Date.now().toString(), name: "", quantity: "" },
            ],
          }
        : meal
    );
    setMeals(newMeals);
  };

  const updateMeal = (
    index: number,
    updatedMeal: {
      id: string;
      foods: { id: string; name: string; quantity: string }[];
      time: string;
    }
  ) => {
    const newMeals = meals.map((meal, i) =>
      i === index
        ? {
            ...meal,
            id: updatedMeal.id,
            foods: updatedMeal.foods,
            time: updatedMeal.time,
          }
        : meal
    );

    setMeals(newMeals);
  };

  const updateFoodInMeal = (
    mealIndex: number,
    foodIndex: number,
    updatedFood: { id: string, name: string; quantity: string }
  ) => {
    const newMeals = meals.map((meal, index) =>
      index === mealIndex
        ? {
            ...meal,
            foods: meal.foods.map((food, i) =>
              i === foodIndex ? { ...food, ...updatedFood } : food
            ),
          }
        : meal
    );
    setMeals(newMeals);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!clientId) {
      toast.error("Por favor, selecione um cliente.");
      return;
    }

    try {
      const formattedDate = new Date(date).toISOString().split("T")[0];

      const dietaResponse = await apiClient.post("/dieta", {
        description: description,
        date: formattedDate,
        clientId: clientId,
      });

      const dietaId = dietaResponse.data.data.id;
      
      for (const meal of meals) {
        const refeicaoResponse = await apiClient.post("/refeicao", {
          dietaId,
          horario: meal.time,
        });
        
        const refeicaoId = refeicaoResponse.data.data.id;
  
        for (const food of meal.foods) {
          await apiClient.post("/alimentoRefeicao", {
            refeicaoId: refeicaoId,
            alimentoId: food.id,
            quantidadeTotal: food.quantity,
          });
        }
      }

      toast.success("Dieta salva com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar a dieta:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Criar Dieta</h1>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="clientId">Cliente</label>
          <select
            id="clientId"
            value={clientId}
            onChange={(e) => {
              setClientId(e.target.value);
            }}
            className={styles.input}
          >
            <option value="" disabled>
              Selecionar cliente
            </option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroupData}>
          <label htmlFor="date">Data</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroupDescription}>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.containerRefs}>
          <h1>Refeições</h1>
          <a className={styles.btnAddRef} onClick={addMeal}>
            Adicionar refeição
            <GiSpoon style={{ marginLeft: 3 }} />
          </a>
        </div>
        {meals.map((meal, mealIndex) => (
          <div key={meal.id} className={styles.mealGroup}>
            <label>Horário</label>
            <input
              type="time"
              value={meal.time}
              onChange={(e) =>
                updateMeal(mealIndex, { ...meal, time: e.target.value })
              }
              className={styles.input}
            />

            {meal.foods.map((food, foodIndex) => (
              <div key={food.id} className={styles.foodGroup}>
                <label>Alimento</label>
                <select
                  value={food.id}
                  onChange={(e) =>
                    updateFoodInMeal(mealIndex, foodIndex, {
                      ...food,
                      id: e.target.value,
                      name:
                        alimentos.find(
                          (alimento) => alimento.id === e.target.value
                        )?.name || "",
                    })
                  }
                  className={styles.input}
                >
                  <option value="" disabled>
                    Selecione um alimento
                  </option>
                  {alimentos.map((alimento) => (
                    <option key={alimento.id} value={alimento.id}>
                      {alimento.name}
                    </option>
                  ))}
                </select>
                <label>Quantidade</label>
                <input
                  type="text"
                  value={food.quantity}
                  onChange={(e) =>
                    updateFoodInMeal(mealIndex, foodIndex, {
                      ...food,
                      quantity: e.target.value,
                    })
                  }
                  className={styles.input}
                />
              </div>
            ))}

            <button type="button" onClick={() => addFoodToMeal(mealIndex)}>
              Adicionar Alimento
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          Salvar Dieta
        </button>
      </form>
    </div>
  );
};

export default CreateDiet;
