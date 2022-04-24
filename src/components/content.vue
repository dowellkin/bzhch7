<template lang='pug'>
.content
	.content__title.part__title Решение
	.content__body
		span.content__subheader размеры и площадь зоны химического заражения
		p.
			1 По таблице 2 определяем степень вертикальной устойчивости воздуха. При указанных метеоусловиях – это {{translate(getVertical)}}.
		p
			| 2 По таблице 3 находим, что на открытой местности при {{translate(getVertical)}} для {{translate(getState.matter)}} глубина распространения зараженного облака с поражающей концентрацией при скорости ветра 1 м/с равна {{getState.deepness}} км. Поправочный коэффициент для скорости ветра {{getState.wind}} м/с равен {{getState.coef}} (находим по таблице 5).
			template(v-if="getState.isNeedHalf").
				Так как емкость обвалованная, то глубина распространения облака уменьшается в 1,5 раза.
		p.
			3 Находим глубину распространения зараженного облака, которая равна:
		p.content__formula
			template(v-if="getState.isNeedHalf").
				Г = {{getState.deepness}} • {{getState.coef}} / 1.5 = {{getState.G}} км
			template(v-else).
				Г = {{getState.deepness}} • {{getState.coef}} = {{getState.G}} км
		p.
			4 Находим ширину зоны химического заражения при инверсии, которая равна:
		p.content__formula.
			Ш = {{getState.shCoef}}Г ={{getState.shCoef}} • {{getState.G}} = {{getState.sh}} км
		p.
			5 Находим площадь зоны химического заражения, которая равна:
		p.content__formula.
			S = 0,5ГШ = 0,50 • {{getState.G}} • {{getState.sh}} = {{getState.S}} км2.
			
		span.content__subheader время подхода зараженного облака к объекту или рубежу
		p.
			1 По таблице 6 для {{translate(getVertical)}}, скорости ветра {{getState.wind}} м/с и расстояния менее {{getState.distance}} км находим скорость переноса облака зараженного воздуха, которая равна {{getState.avgSpeed}} м/с.
		p.
			2 Находим время подхода зараженного облака к населенному пункту, которое равно:
		p.content__formula.
			t = R/W = {{getState.distance*1000}} / {{getState.avgSpeed}} = {{getState.time}} с или {{getState.timeSec}} мин

			
		span.content__subheader время поражающего действия ХОВ в очаге поражения
		p
			| 1 По таблице 3 находим, что на открытой местности при {{translate(getVertical)}} для {{translate(getState.matter)}} глубина распространения зараженного облака с поражающей концентрацией при скорости ветра 1 м/с равна {{getState.deepness}} км. Поправочный коэффициент для скорости ветра {{getState.wind}} м/с равен {{getState.coef}} (находим по таблице 5).
			template(v-if="getState.isNeedHalf").
				Так как емкость обвалованная, то глубина распространения облака уменьшается в 1,5 раза.
			|  Соответственно, глубина зоны химического поражения составит:
			
		p.content__formula
			template(v-if="getState.isNeedHalf").
				Г = {{getState.deepness}} • {{getState.coef}} / 1.5 = {{getState.G}} км
			template(v-else).
				Г = {{getState.deepness}} • {{getState.coef}} = {{getState.G}} км
		
		p.
			2 По таблице 7 находим, что для {{getState.size}} т хлора при температуре {{getState.temp}}˚С продолжительность поражающего действия составляет {{getState.time2}} ч.

		p
			| 3 Строим график. По оси абсцисс откладываем {{getState.G}} км, по оси ординат – время, равное {{getState.time2}} ч. Соединяем точки А и Б прямой. Восстанавливаем перпендикуляр с точки, равной {{getState.distance}} км до пересечения с прямой АБ (точка В). Из точки В проводим прямую до оси ординат. Находим, что поражающее действие хлора на расстоянии {{getState.distance}} км от участка аварии составляет {{getState.coords.smallY.toFixed(2)}} ч.
			span(v-if="getState.coords.smallY < 0.1").gavno
				|  (но судя по всему пишем 0.1 потому что растояние до объекта или рубежа меньше глубины распространения)
		.picture
			svg(width="300" height="300" :viewport="`0 0 ${svg.width} ${svg.height}`")
				rect(width="1" :height="svg.height" style="fill: #fff")
				rect(:width="svg.width" height="1" :y="svg.height-1" style="fill: #fff")
				line(x1="1" y1="50" x2="250" :y2="svg.height" stroke="#42b883" stroke-width="2")
				path(:d="`M${getState.coords.x} ${svg.height-1} ${getState.coords.x} ${calcY(getState.coords.y)} 1 ${calcY(getState.coords.y)}`" fill="none" stroke="#C792EA" stroke-width="2" stroke-dasharray="8")
				text(:x="1+svg.textOffset" :y="50-svg.textOffset" class="small" fill="#fff") {{getState.time2}} ч.
				text(:x="250+svg.textOffset" :y="300-svg.textOffset" class="small" fill="#fff") {{getState.G}} км.
				text(:x="1+svg.textOffset" :y="calcY(getState.coords.y)-svg.textOffset" class="small" fill="#fff") {{getState.coords.smallY < 0 ? "0.1" : getState.coords.smallY.toFixed(2)}} ч.
				text(:x="getState.coords.x+svg.textOffset" :y="300-svg.textOffset" class="small" fill="#fff") {{getState.distance}} км.
			template(v-if="getState.coords.smallY < 0")
				.gavno
					| У тебя такое судя по всему из-за того, что Г меньше, чем расстояние до объекта или рубежа
			| Рисунок работает норм, но рисуйте на свой страх и риск

		span.content__subheader возможные потери и структура потерь #[b рабочих], попавшего в зону химического заражения
		p.
			1 В соответствии с таблицей 8 потери рабочих и служащих при {{variant.sizWorkers}}% обеспечении противогазами составят {{getState.damageWorkersPercent}}%:
		p.content__formula.
			{{variant.countWorkers}} : 100 • {{getState.damageWorkersPercent}} = {{getState.damageWorkers}} человек(а).
		p.
			2 В соответствии с примечанием к таблице 8, структура потерь рабочих и служащих завода составит: легкой степени тяжести – {{getState.damageWorkers}} : 100 • 25 = {{getState.damageWorkers / 100 * 25}} человек(а), средней и тяжелой степени тяжести – {{getState.damageWorkers}} : 100 • 40 = {{Math.round(getState.damageWorkers / 100 * 40)}} человек(а), со смертельным исходом – {{getState.damageWorkers}} : 100 • 35 = {{Math.round(getState.damageWorkers / 100 * 35)}} человек(а).
		p.
			Всего потери рабочих и служащих со смертельными исходом и потерявших трудоспособность составят {{Math.round(getState.damageWorkers / 100 * 40) + Math.round(getState.damageWorkers / 100 * 35)}} человек(а).

		span.content__subheader возможные потери и структура потерь #[b населения], попавшего в зону химического заражения
		p.
			1 В соответствии с таблицей 8 потери рабочих и служащих при {{variant.sizPeoples}}% обеспечении противогазами составят {{getState.damagePeoplesPercent}}%:
		p.content__formula.
			{{variant.countPeoples}} : 100 • {{getState.damagePeoplesPercent}} = {{getState.damagePeoples}} человек(а).
		p.
			2 В соответствии с примечанием к таблице 8, структура потерь рабочих и служащих завода составит: легкой степени тяжести – {{getState.damagePeoples}} : 100 • 25 = {{getState.damagePeoples / 100 * 25}} человек(а), средней и тяжелой степени тяжести – {{getState.damagePeoples}} : 100 • 40 = {{Math.round(getState.damagePeoples / 100 * 40)}} человек(а), со смертельным исходом – {{getState.damagePeoples}} : 100 • 35 = {{Math.round(getState.damagePeoples / 100 * 35)}} человек(а).
		p.
			Всего потери рабочих и служащих со смертельными исходом и потерявших трудоспособность составят {{Math.round(getState.damagePeoples / 100 * 40) + Math.round(getState.damagePeoples / 100 * 35)}} человек(а).

</template>

<script>
import dict from "@/dict.json"

export default {
	name: 'content',
	data: () => ({
		svg: {
			width: 300,
			height: 300,
			textOffset: 10
		}
	}),
	computed: {
		getVertical(){
			return this.$store.getters['getVertical']
		},
		getState(){
			return this.$store.getters['getState']
		},
		variant(){
			return this.$store.getters['getFullVariant']
		}
	},
	methods: {
		translate(str){
			return dict[str] ?? str
		},
		calcY(y){
			let data = this.svg.height - y;
			if(data < 0 || data > this.svg.height){
				data = this.svg.height - 2;
			}
			return data;
		}
	}
}
</script>

<style lang="sass">
@import "../main.sass"

.gavno
	color: #F07178

.content
	margin-top: 40px

	.picture
		text-align: center

	svg
		margin: 0 auto
		display: block
		overflow: visible
		margin-bottom: 5px

	&__body
		color: #fff

	&__formula
		display: block
		margin: 0 auto
		width: max-content
		background: rgba(#000, .2)
		padding: 9px 12px
		border-radius: 6px
		border: 1px solid rgba(#000, .3)

	&__subheader
		color: $c-main
		font-size: 1.3rem
		display: inline-block
		margin-top: 20px
		padding-left: 10px

		&::before
			content: "- "
</style>