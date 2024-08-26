const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');
const userModel = require('../models/userModels');
const getDoctorInfoController = async (req,res)=>{
    try{
        const doctor =  await doctorModel.findOne({userId: req.body.userId});
        res.status(200).send({
            success:true,
            message: "Doctor data fetched successfully",
            data:doctor,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: "Error in fetching Doctor Details"
        })
    }
}

const updateProfileController = async (req,res) =>{
    try{
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId}, req.body);
        res.status(201).send({
            success:true,
            message:"Doctor Profile Updated",
            data: doctor,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Doctor Profile Update Failed",
            error
        });
    }
};

const getDoctorByIdController = async (req,res) => {
    try{
        const doctor = await doctorModel.findOne({ _id: req.body.doctorId});
        res.status(200).send({
            success:true,
            message:"Single Doc info fetched",
            data:doctor,
        });

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in fetching data",
        });
    }
}

const doctorAppointmentsController = async (req,res) => {
    try{
        const doctor = await doctorModel.findOne({userId: req.body.userId});
        const appointments = await appointmentModel.find({
            doctorId: doctor._id,
        });
        res.status(200).send({
            success:true,
            message:"Doctor Appointments fetch successfully",
            data: appointments,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Doc Appointments",
        })

    }
}

const updateStatusController = async (req,res) =>{
    try{
        const {appointmentId , status} = req.body
        const appointment = await appointmentModel.findByIdAndUpdate(appointmentId,{status})
        const user = await userModel.findOne({ _id: appointment.userId});
        const notifcation = user.notifcation;
        notifcation.push({
            type:"Status-Updated",
            message:`Your Appointment has been Updated ${status}`,
            onClickPath:"/doctor-appointments",
        });
        await user.save();
        res.status(200).send({
            success:true,
            message:"Appointments Status Updated",
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"Error in Update status",
        })
    }
 };

module.exports = {getDoctorInfoController , updateProfileController , getDoctorByIdController , doctorAppointmentsController , updateStatusController};