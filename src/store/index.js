import { createStore } from 'vuex'
import tasks from '@/tasks.json'
import vertical from '@/vertical.json'
import deepness from '@/deepness.json'
import coef from '@/coef.json'
import avgSpeed from '@/avgSpeed.json'
import time from '@/time.json'
import damage from '@/damage.json'

export default createStore({
  state: {
		task: 1,
		variant: 1,

		vertical: "",
		coef: 0,
		deepness: 0,
		G: 0
  },
  mutations: {
		setTask(state, data){
			state.task = data
			this.commit('recalculate')
		},
		setVariant(state, data){
			state.variant = data
			this.commit('recalculate')
		},
		recalculate(state){
			state.vertical = calculateVerticalType(state);
			calculateSecondStep(state)
			calculateThirdStep(state)
			calculateFourthStep(state)
			calculateFifthStep(state)
			calculate_2_1(state)
			calculate_3_1(state)
			calculate_pictureCoords(state)
			calculate_4_1(state)
		}
  },
  actions: {
  },
  getters: {
		getTask(store){
			return store.task
		},
		getVariant(store){
			return store.variant
		},
		getVertical(store){
			return store.vertical
		},
		getState(store){
			return store
		},
		getFullTask(state){
			return tasks[state.task-1]
		},
		getFullVariant(state){
			const task = tasks[state.task-1];
			return task.variants[state.variant-1]
		}
  }
})

function calculateVerticalType(state){
	const task = tasks[state.task-1];
	const variant = task.variants[state.variant-1]
	const table = vertical[variant.time][variant.weather]
	const wind = variant.wind;
	let max = -Infinity
	let result = ''
	Object.entries(table).forEach(el => {
		const n = +el[0]
		if(n < wind && n > max){
			max = n
			result = el[1]
		}
	})
	return result
}

function calculateSecondStep(state){
	const task = tasks[state.task-1];
	const variant = task.variants[state.variant-1]
	const wind = variant.wind;
	
	state.deepness = deepness[task.meta.space][task.meta.matter][state.vertical][task.meta.size]
	state.coef = coef[state.vertical][variant.wind]
	state.wind = wind
	state.matter = task.meta.matter
	state.distance = task.meta.distance
	state.size = task.meta.size
	state.temp = variant.temperature
}

function calculateThirdStep(state){
	const task = tasks[state.task-1];
	state.isNeedHalf = task.meta.capacity == 'obval'
	state.G = state.deepness * state.coef
	if(state.isNeedHalf){
		state.G = state.G / 1.5
	}
	state.G = +state.G.toFixed(3)
}

function calculateFourthStep(state){
	switch (state.vertical) {
		case 'inverison':
			state.shCoef = 0.03
			state.sh = 0.03 * state.G

			break;
		case 'isotermion':
			state.shCoef = 0.15
			state.sh = 0.15 * state.G
			
			break;
		case 'convection':
			state.shCoef = 0.8
			state.sh = 0.8 * state.G
			
			break;
	
		default:
			break;
	}
	state.sh = +state.sh.toFixed(3)
}

function calculateFifthStep(state){
	state.S = +(0.5 * state.G * state.sh).toFixed(3)
}

function calculate_2_1(state){
	const task = tasks[state.task-1];
	const variant = task.variants[state.variant-1]

	state.avgSpeed = avgSpeed[state.vertical][task.meta.distance > 10 ? "r+" : "r-"][variant.wind-1]
	state.distance = task.meta.distance
	state.time = +(state.distance * 1000 / state.avgSpeed).toFixed(2)
	state.timeSec = +(state.time / 60).toFixed(2)
}

function calculate_3_1(state){
	const task = tasks[state.task-1];
	const variant = task.variants[state.variant-1]
	state.time2 = time[task.meta.matter][variant.temperature][task.meta.size]
}

function calculate_pictureCoords(state){
	state.coords = {}
	state.coords.x = 250 / state.G * state.distance
}

function calculate_4_1(state){
	const task = tasks[state.task-1];
	const variant = task.variants[state.variant-1];
	
	state.damageWorkersPercent = damage[task.meta.workers][variant.sizWorkers]
	state.damageWorkers = variant.countWorkers / 100 * state.damageWorkersPercent

	state.damagePeoplesPercent = damage[task.meta.peoples][variant.sizPeoples]
	state.damagePeoples = variant.countPeoples / 100 * state.damagePeoplesPercent


}