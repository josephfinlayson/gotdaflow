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
            expect( results ).to.be.have.length( 8 );
            expect( results[0] ).to.be.equal( 'start' );
            expect( results[1] ).to.be.equal( 'Checking if candidate has JS skills | passed' );
            expect( results[2] ).to.be.equal( 'Checking if candidate has Backbone skills | passed' );
            expect( results[3] ).to.be.equal( 'Checking if candidate has Angular skills | failed' );
            expect( results[4] ).to.be.equal( 'Checking if candidate is kind | passed' );
            expect( results[5] ).to.be.equal( 'Checking if candidate is an idiot | failed' );
            expect( results[6] ).to.be.equal( 'Checking if candidate is cool | failed' );
            expect( results[7] ).to.be.equal( 'end' );

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


        it( 'Checks if a rule with the supplied key-value pair already exists in the flow and returns it if so', () =>
        {
            expect( flowgenerator._findWhere( 'id', '1' ) ).to.be.truthy;
            expect( flowgenerator._findWhere( 'title', 'My Neverending Rule' ) ).to.be.false;
            expect( flowgenerator._findWhere( 'favouriteFood', 'Hummus' ) ).to.be.false;
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
    } );
});
