import React from 'react/addons';
import { expect } from 'chai';
import FlowGenerator from '../../src/utils/flow-generator';
import sampleJSON from '../sample.json';


describe( 'Flow Generator', () =>
{

    describe( 'Adding rules', () =>
    {
        var flowgenerator = new FlowGenerator();
        
        it ( 'Adding a rule to the flow generator', () =>
        {
            flowgenerator.addRule(
            {
                id            : '1',
                title         : 'My First Rule',
                body          : '( data ) => { if ( 0 < 1 ) return true }',
                trueResultId  : '2',
                falseResultId : '3'
            } );

            expect( flowgenerator._rules ).to.have.length( 1 );
            expect( flowgenerator._rules[0] ).to.be.an( 'object' );
            expect( flowgenerator._rules[0].id ).to.be.equal( '1' );
            expect( flowgenerator._rules[0].title ).to.be.equal( 'My First Rule' );
            expect( flowgenerator._rules[0].body ).to.be.a( 'string' );
            expect( flowgenerator._rules[0].trueResultId ).to.be.equal( '2' );
            expect( flowgenerator._rules[0].falseResultId ).to.be.equal( '3' );
        } );

        it( 'Gets the rules stored in the generator', () =>
        {
            var rules = flowgenerator.getRules();
            expect( rules ).to.be.an( 'array' );
            expect( rules ).to.have.length( 1 );
            expect( rules[0] ).to.be.an( 'object' );
            expect( rules[0].id ).to.be.equal( '1' );
            expect( rules[0].title ).to.be.equal( 'My First Rule' );
            expect( rules[0].body ).to.be.a( 'string' );
            expect( rules[0].trueResultId ).to.be.equal( '2' );
            expect( rules[0].falseResultId ).to.be.equal( '3' );
        } );

        it( 'Resets the rules stored in the generator', () =>
        {
            expect( flowgenerator.getRules() ).to.be.an( 'array' );
            expect( flowgenerator.getRules() ).to.have.length( 1 );
            flowgenerator.resetRules();
            expect( flowgenerator.getRules() ).to.be.an( 'array' );
            expect( flowgenerator.getRules() ).to.have.length( 0 );
        } );
    } );


    describe( 'Execution', () =>
    {
        it( 'Executes a flow of rules', () =>
        {
            var flowgenerator = new FlowGenerator();

            flowgenerator.addRule(
            {
                id : '20',
                title : 'Checking if candidate has JS skills',
                body : '( data ) =>{return data.skills && data.skills.indexOf( "JS" ) !== -1}',
                trueResultId : '654',
                falseResultId : null
            } );

            flowgenerator.addRule(
            {
                id : '654',
                title : 'Checking if candidate has Backbone skills',
                body : '( data ) => { return data.skills && data.skills.indexOf( "Backbone" ) !== -1}',
                trueResultId : '233',
                falseResultId : null
            } );

            flowgenerator.addRule(
            {
                id : '233',
                title : 'Checking if candidate has Angular skills',
                body : '( data ) => { return data.skills && data.skills.indexOf( "Angular" ) !== -1}',
                trueResultId : '2347',
                falseResultId : '2347'
            } );

            flowgenerator.addRule(
            {
                id : '2347',
                title : 'Checking if candidate is kind',
                body : '( data ) => { return data.personality && data.personality.indexOf( "kind" ) !== -1}',
                trueResultId : '666',
                falseResultId : '666'
            } );

            flowgenerator.addRule(
            {
                id : '666',
                title : 'Checking if candidate is an idiot',
                body : '( data ) => { return data.personality && data.personality.indexOf( "idiot" ) !== -1}',
                trueResultId : null,
                falseResultId : '1'
            } );

            flowgenerator.addRule(
            {
                id : '1',
                title : 'Checking if candidate is cool',
                body : '( data ) => { return data.personality && data.personality.indexOf( "cool" ) !== -1}',
                trueResultId : null,
                falseResultId : null
            } );

            var results = flowgenerator.execute( sampleJSON );
            expect( results ).to.be.an( 'array' );
            expect( results ).to.be.have.length( 6 );
            expect( results[0].title ).to.be.equal( 'Checking if candidate has JS skills' );
            expect( results[0].passed ).to.be.equal( true );
            expect( results[0].id ).to.be.equal( '20' );
            expect( results[1].title ).to.be.equal( 'Checking if candidate has Backbone skills' );
            expect( results[1].passed ).to.be.equal( true );
            expect( results[1].id ).to.be.equal( '654' );
            expect( results[2].title ).to.be.equal( 'Checking if candidate has Angular skills' );
            expect( results[2].passed ).to.be.equal( false );
            expect( results[2].id ).to.be.equal( '233' );
            expect( results[3].title ).to.be.equal( 'Checking if candidate is kind' );
            expect( results[3].passed ).to.be.equal( true );
            expect( results[3].id ).to.be.equal( '2347' );
            expect( results[4].title ).to.be.equal( 'Checking if candidate is an idiot' );
            expect( results[4].passed ).to.be.equal( false );
            expect( results[4].id ).to.be.equal( '666' );
            expect( results[5].title ).to.be.equal( 'Checking if candidate is cool' );
            expect( results[5].passed ).to.be.equal( false );
            expect( results[5].id ).to.be.equal( '1' );

        } );
    } );

    describe( 'Function creation from string', () =>
    {
        it( 'Generates a string from a string', ()=>
        {
            var flowgenerator = new FlowGenerator();
            var string = "function( data ) { return data !== false }";
            var createdFunction = flowgenerator._createFunctionFromString( string );
            expect( createdFunction( {ofir : 'cool'} ) ).to.be.true;
        } );
    } );


    describe( 'Validation', () =>
    {
        var flowgenerator = new FlowGenerator();

        flowgenerator.addRule(
        {
            id            : '1',
            title         : 'My First Rule',
            body          : '( data ) => { if ( 0 < 1 ) return true }',
            trueResultId  : '5',
            falseResultId : '22'
        } );

        flowgenerator.addRule(
        {
            id    : '2',
            title : 'my Second rule',
            body  : '( data ) => { if ( 0 < 1 ) return true }'
        } );

        flowgenerator.addRule(
        {
            id    : '3',
            title : 'my third rule',
            body  : '( data ) => { if ( 0 < 1 ) return true }'
        } );

        it( 'Checks if a rule with the supplied key-value pair already exists in the flow and returns it if so', () =>
        {
            expect( flowgenerator._findWhere( 'id', '1' ) ).to.be.truthy;
            expect( flowgenerator._findWhere( 'title', 'My Neverending Rule' ) ).to.be.false;
            expect( flowgenerator._findWhere( 'favouriteFood', 'Hummus' ) ).to.be.false;
            expect( flowgenerator._findWhere( 'falseResultId', null) ).to.be.false;
        } );

        flowgenerator = new FlowGenerator();

        flowgenerator.addRule(
        {
            id            : '1',
            title         : 'My First Rule',
            body          : '( data ) => { if ( 0 < 1 ) return true }',
            trueResultId  : '5',
            falseResultId : '22'
        } );

        it( 'Throwing an exception if an id already exists', () =>
        {
            var rule =
            {
                id            : '1',
                title         : 'My Second Rule',
                body          : '( data ) => { if ( 2 > 1 ) return true }',
                trueResultId  : '3',
                falseResultId : null
            };

            expect( () => { flowgenerator._validateIds( rule ) } ).to.throw( /101/ );
            expect( flowgenerator._rules ).to.have.length( 1 );
        } );

        it( 'Throwing an exception if an true result id already exists', () =>
        {
            var rule =
            {
                id            : '2',
                title         : 'My Second Rule',
                body          : '( data ) => { if ( 2 > 1 ) return true }',
                trueResultId  : '5',
                falseResultId : null
            };

            expect( () => { flowgenerator._validateIds( rule ) } ).to.throw( /104/ );
            expect( flowgenerator._rules ).to.have.length( 1 );
        } );

        it( 'Throwing an exception if a false result id already exists', () =>
        {
            var rule =
            {
                id            : '2',
                title         : 'My Second Rule',
                body          : '( data ) => { if ( 2 > 1 ) return true }',
                trueResultId  : '4',
                falseResultId : '22'
            };

            expect( () => { flowgenerator._validateIds( rule ) } ).to.throw( /105/ );
            expect( flowgenerator._rules ).to.have.length( 1 );
        } );

        it( 'Throwing an exception if the first rule id is the true result id', () =>
        {
            var rule =
            {
                id            : '2',
                title         : 'My Second Rule',
                body          : '( data ) => { if ( 2 > 1 ) return true }',
                trueResultId  : '1',
                falseResultId : null
            };

            expect( () => { flowgenerator._validateIds( rule ) } ).to.throw( /106/ );
            expect( flowgenerator._rules ).to.have.length( 1 );
        } );

        it( 'Throwing an exception if the first rule id is the false result id', () =>
        {
            var rule =
            {
                id            : '2',
                title         : 'My Second Rule',
                body          : '( data ) => { if ( 2 > 1 ) return true }',
                trueResultId  : '566',
                falseResultId : '1'
            };

            expect( () => { flowgenerator._validateIds( rule ) } ).to.throw( /107/ );
            expect( flowgenerator._rules ).to.have.length( 1 );
        } );

        it( 'Throwing an exception if the rule true result id is the same as the rule id', () =>
        {
            var rule =
            {
                id            : '2',
                title         : 'My Second Rule',
                body          : '( data ) => { if ( 2 > 1 ) return true }',
                trueResultId  : '2',
                falseResultId : '22'
            };

            expect( () => { flowgenerator._validateIds( rule ) } ).to.throw( /102/ );
            expect( flowgenerator._rules ).to.have.length( 1 );
        } );

        it( 'Throwing an exception if the rule false result id is the same as the rule id', () =>
        {
            var rule =
            {
                id            : '2',
                title         : 'My Second Rule',
                body          : '( data ) => { if ( 2 > 1 ) return true }',
                trueResultId  : '22',
                falseResultId : '2'
            };

            expect( () => { flowgenerator._validateIds( rule ) } ).to.throw( /103/ );
            expect( flowgenerator._rules ).to.have.length( 1 );
        } );

        it( 'Validates a rule structure', () =>
        {
            var flowgenerator = new FlowGenerator();
            var badRule1 = {};
            expect( () => { flowgenerator._validateRule( badRule1 ) } ).to.throw( 107 );
            var badRule2 = { id : '23' };
            expect( () => { flowgenerator._validateRule( badRule2 ) } ).to.throw( 107 );
            var badRule3 = { id : '23', title : 'My First Rule' };
            expect( () => { flowgenerator._validateRule( badRule3 ) } ).to.throw( 107 );
            var badRule4 = { id : '23', title : 'My First Rule', body : '(data) => {}' };
            expect( () => { flowgenerator._validateRule( badRule4 ) } ).to.not.throw();
        } );

        xit( 'Compares only strings as rule ids', () => 
        {
            var flowgenerator = new FlowGenerator();
            flowgenerator.addRule(
            {
                id    : '1',
                title : 'Rule with no falseResultId',
                body  : '(data)=>{return data !== false}'
            } );

            flowgenerator.addRule(
            {
                id    : '2',
                title : 'Another Rule with no falseResultId',
                body  : '(data)=>{return data !== false}'
            } );

            var firstRuleFalseResultId = flowgenerator.getRules()[0].falseResultId;

            console.log( firstRuleFalseResultId );

            // flowgenerator._findWhere( 'falseResultId', )
        } );
    } );
});
