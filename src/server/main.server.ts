import { makeHello } from "@shared/module";
import * as services from "@rbxts/services";
import * as roblox from "@rbxts/new";

print( makeHello( "server/main.server.ts" ) );

services.CollectionService.GetTagged( "Lava" ).forEach( part =>
{
	if ( part.IsA( "BasePart" ) )
	{
		part.Touched.Connect( otherPart =>
		{
			const character = otherPart.Parent;
			if ( character && character.IsA( "Model" ) )
			{
				character.BreakJoints();
			}
		} );
	}
} );

let l_parts: Array<Part> = [];
let l_baseplate = services.Workspace.WaitForChild( "Baseplate" );

while ( true )
{
	l_parts.map( p_part => p_part.Destroy() );
	l_parts = [];

	for ( let l_x = 0; l_x < 20; l_x++ )
	{
		for ( let l_y = 0; l_y < 10; l_y++ )
		{
			let l_part = new roblox.Part( services.Workspace );
			l_part.Name = `Part${l_x}${l_y}`;
			l_part.Size = new Vector3( 1, 1, 1 );
			l_part.Position = new Vector3( l_x, l_y, l_part.Position.Z );
			let l_weldConstraint = new roblox.WeldConstraint( l_part );
			l_weldConstraint.Part0 = l_part;
			l_weldConstraint.Part1 = l_y < 1 ? l_baseplate as any : l_parts.copy().pop();
			l_parts.push( l_part );
		}
	}

	let l_ball = new roblox.Part( services.Workspace );
	l_ball.Shape = Enum.PartType.Ball;
	l_ball.Size = new Vector3( 50, 50, 50 );
	l_ball.Position = new Vector3( 10, 5, 100 );
	l_ball.Velocity = new Vector3( 0, 0, -50 );
	l_ball.Touched.Connect( p_part =>
	{
		if ( l_parts.indexOf( p_part as Part ) >= 0 )
		{
			p_part.GetConnectedParts( false ).map( p_part => p_part.BreakJoints() );
			p_part.BreakJoints();
		}
	} );
	l_parts.push( l_ball );
	wait( 10 );
}


