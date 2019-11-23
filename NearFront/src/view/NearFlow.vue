<template>
	<div class="dv">
		<div v-if="isBefore">
			<div v-if="victim | police | policeWay" class="rightBox">
				<div class="testline">
					<div v-if="victim" :style="red" class="firstDiv">
						<img
							src="../../public/NumberOne.png"
							width="30px"
							align="left"
							class="imgMv"
						/>
					</div>
					<div v-else-if="police" :style="purple" class="firstDiv">
						<img
							src="../../public/NumberTwo.png"
							width="30px"
							align="left"
							class="imgMv"
						/>
					</div>
					<div v-else-if="policeWay" :style="blue" class="firstDiv">
						<img
							src="../../public/NumberThree.png"
							width="30px"
							align="left"
							class="imgMv"
						/>
					</div>
					<div v-if="victim" class="secondDiv">{{ callInfo1 }}</div>
					<div v-else-if="police" class="secondDiv">{{ callInfo3 }}</div>
					<div v-else-if="policeWay" class="secondDiv">{{ callInfo2 }}</div>
					<div>
						<span v-if="victim" class="thirdDiv">
							{{ victimName }},
							<span>{{ typeOfCall[0] }}</span>
						</span>

						<span v-if="police" class="thirdDiv">
							{{ victimWHO }}
							<span>수동 신고</span>
						</span>

						<span v-if="policeWay" class="thirdDiv">
							{{ victimWHO }}
							<span>수동 신고</span>
						</span>
					</div>
					<span v-if="victim" class="fourthDiv">{{ currentSituation[0] }}</span>
					<span v-else-if="police" class="fourthDiv">
						{{ policeName }}
						<span>{{ policeClass }}</span>
						<span>({{ policeWorkArea }})</span>
						<span style="padding-left:5px">{{ messages[1] }}</span>
					</span>
					<span v-else-if="policeWay" class="fourthDiv">
						{{ policeName }}
						<span>{{ policeClass }}</span>
						<span>({{ policeWorkArea }})</span>
						<span style="padding-left:5px">{{ messages[3] }}</span>
					</span>
				</div>
			</div>
		</div>

		<div v-else-if="isDone">
			<div>
				<div class="rightBox">
					<div class="testline">
						<div :style="finish" class="Div1">
							<img
								src="../../public/finish.png"
								width="30px"
								align="left"
								class="imgMv"
							/>
						</div>
						<span class="Div2">사건완료</span>
						<div>
							<span class="Div3">
								{{ victimName }}
								<span>{{ typeOfCall[0] }}</span>
							</span>
						</div>
						<div class="Div4">
							<span class="Div4">{{ policeName }}</span>
							<span style="padding-left:5px">{{ policeClass }}</span>
							<span>({{ policeWorkArea }})</span>
							<span>담당</span>
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { EventBus } from '../event/eventBus';

export default {
	data() {
		return {
			isBefore: true,
			newPosition: {},
			messages: ['신고접수', '출동 배정', '출동 중', '출동 승인'],
			currentSituation: ['담당 경찰관이 배정되지 않았습니다.'],
			typeOfCall: ['수동 신고', '자동 신고'],
			red: {
				backgroundColor: '#E60012',
				width: '15%',
				height: '100%',
				alignItem: 'center',
				justifyContent: 'center',
				position: 'center',
			},
			purple: {
				backgroundColor: '#7E318E',
				idth: '15%',
				height: '100%',
				alignItem: 'center',
				justifyContent: 'center',
				position: 'center',
			},
			blue: {
				backgroundColor: '#036EB8',
				idth: '15%',
				height: '100%',
				alignItem: 'center',
				justifyContent: 'center',
				position: 'center',
			},
			victim: false,
			police: false,
			policeWay: false,
			callInfo1: '',
			callInfo2: '',
			callInfo3: '',
			victimName: '',
			policeName: '',
			policeClass: '',
			policeWorkArea: '',
			victimWHO: '',
			isDone: false,
			marker: [],
			policeId: '',
			victimId: '',
			finish: {
				backgroundColor: '#707070',
				width: '15%',
				height: '50px',
				alignItem: 'center',
				justifyContent: 'center',
				position: 'center',
			},
			policeName: '',
			victimName: '',
			policeClass: '',
			policeWorkArea: '',
			whiteCall: 'white.png',
			yellowCall: 'yellow.png',
			policeBackID: '',
			victimBackID: '',
		};
	},
	created() {
		EventBus.$on('policeDONE', (policeMarkers, index) => {
			this.policeId = index;
			// this.isDone = false;
			console.log(index);
			this.policeName = policeMarkers.name;
			this.policeClass = policeMarkers.class;
			this.policeWorkArea = policeMarkers.workArea;
		}),
			EventBus.$on('victimDONE', (victimMarkers, index) => {
				this.victimId = index;
				// this.isDone = false;
				console.log(index);
				this.victimName = victimMarkers.name;
			}),
			EventBus.$on('JOBSDONE', (police, victim) => {
				// setTimeout(() => {
				// 	this.isBefore = false;
				// 	this.isDone = true;
				// 	EventBus.$emit('backYellow', victimId);
				// 	EventBus.$emit('backWhite', policeId);
				// 	EventBus.$emit('backPoliceButton');
				// 	EventBus.$emit('backVictimButton');
				// 	EventBus.$emit('doneCall');
				// 	EventBus.$emit('FinishJob', policeId, victimId);
				// }, 6000);
				this.isBefore = false;
				this.isDone = true;
				console.log('CHECK!', police.id, victim.id);
				EventBus.$emit('backYellow', victim.id);
				EventBus.$emit('backWhite', police.id);
				EventBus.$emit('backPoliceButton');
				EventBus.$emit('backVictimButton');
				EventBus.$emit('doneCall');
				EventBus.$emit('FinishJob', police, victim);
			});
	},
	mounted() {
		EventBus.$on('getPosition2', markers => {
			this.newPosition = markers;
			this.isBefore = true;
			this.isDone = false;
			if (markers.identity === 'victim') {
				// console.log("1) victim");
				this.victim = true;
				this.police = false;
				this.policeWay = false;
				this.callInfo1 = '신고 접수';
				this.victimName = markers.name;
			} else if (markers.identity === 'police') {
				this.police = false;
				this.policeWay = true;
				this.victim = false;
				this.callInfo2 = '출동 중';
				this.policeName = markers.name;
				this.policeClass = markers.class;
				this.policeWorkArea = markers.workArea;
			}
		});
		EventBus.$on('buttonPurple', (markers, victimWho) => {
			this.newPosition = markers;
			console.log('purple!!!');
			if (markers.identity === 'police') {
				this.police = true;
				this.policeWay = false;
				this.victim = false;
				this.callInfo3 = '확인 중';
				this.policeName = markers.name;
				this.policeClass = markers.class;
				this.policeWorkArea = markers.workArea;
				this.victimWHO = victimWho;
			}
		});
	},
};
</script>
<style scoped>
ul {
	list-style-type: none;
	padding-left: 0px;
	margin-top: 0;
	text-align: left;
}
li {
	display: flex;
	min-height: 50px;
	height: 100%;
	line-height: 100%;
	margin: 0.5rem 0;
	padding: 0 0.9rem;
	background: white;
	border-radius: 5px;
	border-color: black;
	border: solid;
	justify-content: left;
	align-items: center;
}
.rightBox {
	float: center;
	width: 100%;
	height: 100%;
	margin: 0 auto;
}
.popUp {
	/* border: 1px solid lightgray; */
	position: right;
	width: 200px;
	height: 50px;
	padding: 0px;
}
.bv-example-row.container {
	width: 75%;
	padding-left: 0px;
	padding-right: 0px;
	margin-right: 0px;
}
.secondContent {
	font-weight: normal;
	font-size: 15px;
	padding: 10px;
}

.divOut {
	border: 1px solid lightgrey;
	border-bottom-left-radius: 5px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	box-sizing: content-box;
	width: 100%;
	height: 48px;
}
.dv {
	padding-left: 20px;
	padding-right: 20px;
}
.testline {
	border: 1px solid lightgrey;
	border-radius: 5px;
	box-sizing: content-box;
	width: 100%;
	height: 50px;
}
.divIn {
	float: left;
	width: 30%;
}
.firstDiv {
	float: left;
	width: 15%;
	background-color: #e60012;
	margin: 0 auto;
	text-align: center;
	align-items: center;
	justify-items: center;
}
.secondDiv {
	width: 20%;
	float: left;

	text-align: center;
	align-items: center;
	justify-items: center;
	margin-left: 10px;
	margin-top: 12px;
}
.thirdDiv {
	width: 55%;
	float: center;
	margin: 0 auto;
	font-size: 11px;
	padding-left: 10px;
}
.fourthDiv {
	width: 55%;
	float: center;
	margin: 0 auto;
	font-size: 11px;
	color: #d0d0d0;
	padding-left: 10px;
	position: absolute;
}
.imgMv {
	margin-left: 10px;
	margin-top: 10px;
}
.Div1 {
	float: left;
	width: 15%;
	background-color: #e60012;
	margin: 0 auto;
	text-align: center;
	align-items: center;
	justify-items: center;
}
.Div2 {
	width: 20%;
	float: left;
	font-weight: bold;
	text-align: center;
	align-items: center;
	justify-items: center;
	margin-left: 10px;
	margin-top: 12px;
}
.Div3 {
	width: 55%;
	float: center;
	margin: 0 auto;
	font-size: 11px;
	padding-left: 10px;
}
.Div4 {
	width: 100%;
	float: center;
	margin: 0 auto;
	font-size: 11px;
	padding-left: 10px;
}
</style>
