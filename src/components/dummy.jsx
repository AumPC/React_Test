/*<VictoryChart
				theme={VictoryTheme.material}
				minDomain={{x: 0, y: 0}}
				domainPadding={{y: 50}}
				>
				<VictoryAxis
					tickValues = {this.props.dataGet}
					tickFormat = {this.props.tickXValues}
					label = {'Time'}
					axisLabelComponent={<VictoryLabel dy={20} />}
					tickLabelComponent={<VictoryLabel 
											style={{fontSize: 8}}
											dy={-5} />}
					/>
				<VictoryAxis
					dependentAxis
					tickValues = {this.props.tickYValues}
					tickFormat = {(t) => `${Math.round(t/1000)}k`}
					label = {'Requests'}
					axisLabelComponent={<VictoryLabel dy={-20} />}
					tickLabelComponent={<VictoryLabel 
											style={{fontSize: 10}}
											dx={5} />}
					/>
				<VictoryLegend
					x={100}
					y={0}
					title={this.props.title}
					centerTitle
					orientation='horizontal'
					style={{
						border: { stroke: 'black' },
						title: {fontSize: 14}
					}}
					gutter={20}
					data={[
						{name: 'GET', symbol: { fill: '#A3C3D9' }},
						{name: 'POST', symbol: { fill: '#CCD6EB' }}
						]}
				/>
				<VictoryStack
					colorScale = {['#A3C3D9', '#CCD6EB']}
					domainPadding = {{x: 10}}
					>
					{this.props.dataMethod.map(method => 
						<VictoryBar key={method}/>
						)}
				</VictoryStack>
			</VictoryChart>*/



			/*<VictoryBar 
					data = {this.props.dataMethod}
					alignment = 'middle'
					animate = {{
						duration: 1000,
						onLoad: {duration: 750}
					}}
					barRatio = {1}
					labels={this.props.dataMethod}
					labelComponent={<VictoryLabel 
										dy={30}
										dx={0}
										style={{fill: '#000',
												fontSize: '10'}} />}
					x = 'time'
					y = 'amount' 
					/>*/