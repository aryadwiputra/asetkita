<?php

namespace App\Http\Controllers;

use App\Models\UnitOfMeasurement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitOfMeasurementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $unit_of_measurements = UnitOfMeasurement::all();

        return Inertia::render('Dashboard/UnitOfMeasurements/Index', ['unit_of_measurements' => $unit_of_measurements]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Dashboard/UnitOfMeasurements/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        UnitOfMeasurement::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return to_route('dashboard.unit_of_measurements.index')->with('success', 'Successfully created unit of measurement.');
    }

    /**
     * Display the specified resource.
     */
    public function show(UnitOfMeasurement $UnitOfMeasurement)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $unit_of_measurement = UnitOfMeasurement::find($id);

        return Inertia::render('Dashboard/UnitOfMeasurements/Edit', ['unitData' => $unit_of_measurement]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        UnitOfMeasurement::find($id)->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return to_route('dashboard.unit_of_measurements.index')->with('success', 'Successfully updated unit of measurement.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = UnitOfMeasurement::find($id);

        if ($data) {
            $data->delete();
            return to_route('dashboard.unit_of_measurements.index')->with('success', 'Successfully deleted unit of measurement.');
        } else {
            return to_route('dashboard.unit_of_measurements.index')->with('error', 'Unit of measurement not found.');
        }
    }
}